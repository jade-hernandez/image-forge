-- Create user_profiles table
create table public.user_profiles (
  id UUID references auth.users (id) on delete CASCADE primary key,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  credits INTEGER default 30, -- Registered users start with 30 credits
  created_at timestamp with time zone default timezone ('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone ('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.user_profiles ENABLE row LEVEL SECURITY;

-- Create policies
create policy "Users can view their own profile" on public.user_profiles for
select
  using (auth.uid () = id);

create policy "Users can update their own profile" on public.user_profiles
for update
  using (auth.uid () = id);

-- Create function to handle new user profile creation
create or replace function public.handle_new_user () RETURNS TRIGGER as $$

BEGIN
  INSERT INTO public.user_profiles (id, credits)
  VALUES (NEW.id, 30);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create profile on user signup
create trigger on_auth_user_created
after INSERT on auth.users for EACH row
execute FUNCTION public.handle_new_user ();

-- Create function to update updated_at timestamp
create or replace function public.update_updated_at_column () RETURNS TRIGGER as $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
create trigger update_user_profiles_updated_at BEFORE
update on public.user_profiles for EACH row
execute FUNCTION public.update_updated_at_column ();
'use client';

import * as React from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '../lib/utils';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Input } from './input';
import { Label } from './label';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

const countries = [
  { value: 'us', label: 'US', code: '+1' },
  { value: 'uk', label: 'UK', code: '+44' },
  { value: 'ca', label: 'Canada', code: '+1' },
  { value: 'au', label: 'Australia', code: '+61' },
  { value: 'de', label: 'Germany', code: '+49' },
  { value: 'fr', label: 'France', code: '+33' },
  { value: 'jp', label: 'Japan', code: '+81' },
  { value: 'cn', label: 'China', code: '+86' },
  { value: 'in', label: 'India', code: '+91' },
  { value: 'br', label: 'Brazil', code: '+55' },
];

export function PhoneInput() {
  const [open, setOpen] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^\d]/g, '');
    setPhoneNumber(value);
  };

  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor='phone'>Phone Number</Label>
      <div className='flex'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              role='combobox'
              aria-expanded={open}
              className='w-[110px] justify-between rounded-r-none border-r-0'
            >
              {selectedCountry?.code}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandInput placeholder='Search country...' />
              <CommandList>
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  {countries.map((country) => (
                    <CommandItem
                      key={country.value}
                      value={country.value}
                      onSelect={() => {
                        setSelectedCountry(country);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedCountry?.value === country.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {country.label} ({country.code})
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          id='phone'
          type='tel'
          value={phoneNumber}
          onChange={handlePhoneChange}
          className='rounded-l-none'
          placeholder='Enter phone number'
        />
      </div>
    </div>
  );
}

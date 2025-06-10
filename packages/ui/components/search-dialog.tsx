import * as React from 'react';

import { Search, X } from 'lucide-react';

import { Button } from './button';
import { Dialog, DialogContent } from './dialog';
import { Input } from './input';

export interface SearchDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  shortcut?: string;
  searchButtonLabel?: string;
  closeButtonLabel?: string;
  registerShortcut?: boolean;
  renderResults?: (searchTerm: string) => React.ReactNode;
  children?: React.ReactNode;
}

export function SearchDialog({
  open,
  onOpenChange,
  placeholder = 'Search...',
  onSearch,
  shortcut = '⌘K',
  searchButtonLabel = 'Search',
  closeButtonLabel = 'Close',
  registerShortcut = true,
  renderResults,
  children,
  ...props
}: SearchDialogProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) {
      setSearchTerm('');
    }
  }, [open]);

  React.useEffect(() => {
    if (!registerShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange, registerShortcut]);

  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() && onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className='gap-0 p-0 sm:max-w-md'>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <div className='flex items-center border-b px-3 py-2'>
            <Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
            <Input
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='placeholder:text-muted-foreground flex h-10 w-full rounded-md border-0 bg-transparent py-3 text-sm outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50'
              placeholder={placeholder}
              aria-label={placeholder}
            />
            <kbd className='bg-muted pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
              {shortcut}
            </kbd>
            <Button
              type='button'
              variant='ghost'
              className='ml-2 h-8 w-8 p-0 sm:ml-0'
              aria-label={closeButtonLabel}
              onClick={() => onOpenChange(false)}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
          {renderResults && searchTerm.trim().length > 0 && (
            <div className='max-h-[50vh] overflow-y-auto p-2'>{renderResults(searchTerm)}</div>
          )}
          {children}
          {!renderResults && (
            <div className='flex items-center justify-end p-3'>
              <Button type='submit' size='sm' disabled={!searchTerm.trim()}>
                {searchButtonLabel}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}

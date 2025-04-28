"use client";

import { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { 
    SearchIcon,
    XIcon, 
} from 'lucide-react'

import { useSearchParam } from '@/hooks/use-search-param';


const SearchInput = () => {
    const [search, setSearch] = useSearchParam();
    const [value, setValue] = useState(search);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleClear = () => {
        setValue("");
        setSearch("");
        inputRef.current?.blur();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(value);
        inputRef.current?.blur();
    };

  return (
    <div className='flex flex-1 items-center justify-center'>
        <form 
        onSubmit={handleSubmit}
        className='w-full relative'
        >
            <Input
            value={value}
            onChange={handleChange}
            ref={inputRef}
            placeholder='Search documents'
            className='md:text-base placeholder:text-xs pl-10 w-full h-8'
            />
            <Button
            type='submit'
            variant="ghost" 
            size="icon"
            className='absolute left-0 top-0 h-full overflow-hidden rounded-full'>
                <SearchIcon/>
            </Button>

            {value && (
                <Button
                onClick={handleClear}
                type='button'
                variant="ghost" 
                size="icon"
                className='absolute right-0 top-0 h-full overflow-hidden rounded-full'>
                    <XIcon/>
                </Button>
            )}

        </form>
    </div>
  )
}

export default SearchInput
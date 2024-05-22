import { 
    Avatar,
    AvatarImage,
    AvatarFallback 
} from "@/components/ui/avatar"

export default function OrderItem(): JSX.Element {
    return (
        <div className='flex items-center'>
            <Avatar className='h-9 w-9'>
                <AvatarImage src='/avatars/05.png' alt='Avatar' />
                <AvatarFallback>SD</AvatarFallback>
            </Avatar>
            <div className='ml-4 space-y-1'>
                <p className='text-sm font-medium leading-none'>Sofia Davis</p>
                <p className='text-sm text-muted-foreground'>sofia.davis@email.com</p>
            </div>
            <div className='ml-auto font-medium'>Harvard University</div>
        </div>
    )
}
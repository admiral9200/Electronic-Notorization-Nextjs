import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import OrderItem from './order-item'

export function RecentOrders() {
  return (
    <div className='space-y-8'>
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
      <OrderItem />
    </div>
  )
}

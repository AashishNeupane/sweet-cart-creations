import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '../types';
import { cn } from '@/lib/utils';

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  },
  confirmed: {
    label: 'Confirmed',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  },
  processing: {
    label: 'Processing',
    className: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
  },
  ready: {
    label: 'Ready',
    className: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100',
  },
  delivered: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-800 hover:bg-green-100',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 hover:bg-red-100',
  },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant="secondary" className={cn('font-medium', config.className)}>
      {config.label}
    </Badge>
  );
}

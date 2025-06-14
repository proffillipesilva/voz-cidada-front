import { Button } from '../ui/button'

interface RefreshButtonProps {
    refresh: () => void;
    className?: string;
}

const RefreshButton = ({ refresh, className }: RefreshButtonProps) => {
  return (
    <Button onClick={refresh} className={`bg-gray-400 hover:bg-gray-500 text-white ${className}`}>
        Atualizar
    </Button>
  )
}

export default RefreshButton
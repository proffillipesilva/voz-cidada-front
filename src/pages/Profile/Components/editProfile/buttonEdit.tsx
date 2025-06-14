import Button from '@mui/material/Button'

interface ButtonEditProps {
    onClick?: () => void;
    className?: string;
}

const ButtonEdit = ({ onClick, className }: ButtonEditProps) => {
  return (
    <Button className={`${className}`} onClick={onClick} variant='contained' color='primary'>
        Editar informações
    </Button>
  )
}

export default ButtonEdit
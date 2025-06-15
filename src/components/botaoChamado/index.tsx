import { Button } from "../ui/button";

function BotaoChamado(props: {className?: string; onClick?: () => void}) {
  const stylePadrao = "bg-[--cor-secundaria4] font-montserrat text-white rounded-lg font-semibold hover:bg-[--cor-secundaria4-hover] transition-colors"

return (
  <Button 
    className={props.className ? props.className : stylePadrao}
    onClick={props.onClick}
  >
    ABRIR CHAMADO
  </Button>
)
}

export default BotaoChamado
import { useContext } from "react"
import { UserContext, TokenContext } from "../context"

function useUserToken() {
  const user = useContext(UserContext)
  const token = useContext(TokenContext)

  return [user, token]
}

export default useUserToken

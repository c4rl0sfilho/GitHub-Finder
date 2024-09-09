import { useState } from "react"
import { UserPops } from "../types/user"
import Search from "../components/Search"
import User from "../components/User"
import Error from "../components/Error"

const Home = () => {

  const [user, setUser] = useState<UserPops | null>(null)
  const [error, setError] = useState(false)

  const loadUser = async (userName: String) => {
    setError(false)
    setUser(null)

    const res = await fetch(`http://api.github.com/users/${userName}`)

    const data = await res.json()

    if(res.status == 404){
      setError(true)
      return
    }

    const { avatar_url, login, location, followers, following } = data

    const userData: UserPops = {
      avatar_url,
      login,
      followers,
      following,
      location
    }
    
    setUser(userData)

  }


  return <div>
    <Search loadUser={loadUser} />
    {user && <User {...user} />}
    {error && <Error/>}
  </div>

}

export default Home



import Link from "next/link"
import { useRouter } from "next/router";
export default function PlayerList(props) {
  const {users} = props
  const router = useRouter()
  console.log(users);
  return (
    <>
      <div>Player List</div>
      <ul>
        {users.map(user => {
          return (
            <li key={user.id}>
              <div onClick={() => router.push(`/players/${user.id}`)}>
                {user.name}
              </div>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const users = await res.json()
  return {
    props: {
      users
    }, // will be passed to the page component as props
  }
}

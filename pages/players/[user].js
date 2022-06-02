import { useRouter } from "next/router"

export default function User(props) {
  const router = useRouter()
  const { user } = router.query
  const { dataUser } = props
  // console.log(dataUser);
  return (
    <>
      <div>User id: { user }</div>
      <div>name: {dataUser.name}</div>
      <div>email: {dataUser.email}</div>
      <div>phone: {dataUser.phone}</div>
      <div>website: {dataUser.website}</div>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
  const users = await res.json()
  const paths = users.map(user => {
    return {
      params: {
        user: `${user.id}`
      }
    }
  })
  // console.log(paths);
  return {
    paths,
    fallback: false // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  // console.log(context);
  const { user } = context.params
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user}`)
  const users = await res.json()
  // console.log(users);
  return {
    props: {
      dataUser: users
    }, // will be passed to the page component as props
  }
}

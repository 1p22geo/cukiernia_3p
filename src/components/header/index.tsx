export const Header = (props: {
  user: string | null
}) => {
  return <div className="w-screen h-10 sticky top-0 bg-red-400 flex flex-row items-center px-2 gap-2">
    <a href="/" className="font-xl hover:underline mr-auto">Cukiernia 3P</a>
    {props.user
      ?
      <></>
      :
      <>
        <a href="/login" className="bg-red-500 hover:bg-red-600 p-1 rounded-md">Zaloguj się</a>
        <a href="/signup" className="bg-red-500 hover:bg-red-600 p-1 rounded-md">Zarejestruj się</a>
      </>
    }

  </div >
}

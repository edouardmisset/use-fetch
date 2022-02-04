import useFetch from './useFetch'

const ImageFetch: (props: any) => JSX.Element = props => {
  const res = useFetch('https://dog.ceo/api/breeds/image/random', {})
  if (!res.response) {
    return <div>Loading...</div>
  }
  const imageUrl = res.response.message
  return (
    <div>
      <img src={imageUrl} alt="avatar" width={400} height="auto" />
    </div>
  )
}

function App() {
  return <ImageFetch />
}

export default App

import "bootstrap/dist/css/bootstrap.min.css"
import SSRProvider from "react-bootstrap/SSRProvider"
import "../styles/globals.css"
import Navs from "../components/app/Navs"
import Container from "react-bootstrap/Container"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SSRProvider>
        <Navs />
        <Container className="my-5">
          <Component {...pageProps} />
        </Container>
      </SSRProvider>
    </>
  )
}

export default MyApp

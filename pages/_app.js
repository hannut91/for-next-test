import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (context) => {
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default MyApp

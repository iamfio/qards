import ContentLoader from 'react-content-loader'

const DotLoader = (props: any): JSX.Element => {
  return (
    <ContentLoader
      viewBox="0 0 400 160"
      height={160}
      width={400}
      backgroundColor="#cde4ff"
      {...props}
    >
      <circle cx="150" cy="86" r="12" />
      <circle cx="194" cy="86" r="12" />
      <circle cx="238" cy="86" r="12" />
    </ContentLoader>
  )
}

export default DotLoader

import Image from 'next/image'

export default function Home() {

  const imageStyle = {
    transform: 'translate(25vw, 25vh)'
  };

  return (
    <>
      <Image
        src={"/images/logo.png"}
        alt='logo.png'
        width={500}
        height={350}
        priority={true}
        style={imageStyle}
      />
    </>
  )
}

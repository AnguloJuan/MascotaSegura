import Image from 'next/image'

export default function Home() {
  return (
    <>
      <Image
        src={"/images/logo.png"}
        alt='logo.png'
        width={500}
        height={350}
        priority={true}
      />
    </>
  )
}

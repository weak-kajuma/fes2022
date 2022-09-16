import type { GetServerSideProps,NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import { client } from '../client'

interface product {
  id: string
  createdAt: string
  updatedAt: string
  url: string
  title: string
  author: string
  image: {
    url: string
    height: number
    width: number
  }
}

const shuffleArray = (array: any) => {
  const cloneArray = [...array];

  const result = cloneArray.reduce((_,cur,idx) => {
    let rand = Math.floor(Math.random() * (idx + 1));
    cloneArray[idx] = cloneArray[rand]
    cloneArray[rand] = cur;
    return cloneArray
  })

  return result;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await client.get({endpoint: 'fes2022',queries: {offset: 0,limit:100}})
  const products = shuffleArray(res.contents)
  return {
    props: {
      data: products
    }
  }
}

const Home: NextPage<any> = ({ data }) => {
  return (
    <div>
      <h1 className={styles.title}>作品一覧</h1>
      <div className={styles.main}>
        {data.map((product: product) => {
          return (
            <div key={product.id} className={styles.product}>
              <a href={product.url}>
                <img src={product.image.url} className={styles.image} />
                <h2>{product.title}</h2>
                <p className={styles.author}>Made by {product.author}</p>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home

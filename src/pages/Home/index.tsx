import React, { useEffect } from 'react'
import { useRequest } from 'ahooks'
import hello from '../..//apis/lambda'
import styles from './index.module.scss'

export default function Home() {
  const { data, loading, run } = useRequest(() => hello())

  useEffect(() => {
    run()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Home</h1>
      <div>
        <>请求函数结果：{loading ? 'loading....' : data?.message}</>
      </div>
    </div>
  )
}

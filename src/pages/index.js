import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import AddExpense from '@/Components/AddExpense'
import CategorizedRecords from '@/Components/CategorizedRecords'
// import ExpenseGraph from '@/Components/ExpenseGraph'
import ExpenseGraph from '@/Components/ExpenseGraph'
import MyProfile from '@/Components/MyProfile'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {



  const { data: session, status } = useSession()
  const [salary, setSalary] = useState('67000')

  const payload = {
    email: session.user.email
  }

  useEffect(() => {
    axios.post('/api/findByEmail', payload)
      .then(function (response) {
        console.log(response.data.data)
      })
      .catch(function (error) {
        console.log(error.response);
      });

  }, [])


  return (
    <>
      <nav className='shadow-xl flex justify-between bg-white text-white px-10 py-5 sticky top-0'>
        <div className='text-2xl text-black font-bold'>
          <Link href='/'>  <span className='text-blue-600'>Fin.</span>Tracker </Link>
        </div>

        <div className='flex justify-centers items-centers'>
          {
            status === 'authenticated' ?
              (<>
                <MyProfile />
                <AddExpense />
                <button className='bg-blue-600 px-6 py-3 rounded ml-2' onClick={() => signOut({ callbackUrl: '/login' })}>Logout</button>


              </>
              )
              :
              (
                <>
                  <Link className='bg-blue-600 px-6 py-3 rounded-lg ml-2' href="/login">Login</Link>
                  <Link className='bg-slate-100 text-blue-600 font-bold border-2 border-blue-600 px-6 py-3 rounded-lg ml-2' href="/login">Sign Up</Link>
                </>
              )
          }
        </div>


      </nav>

      <div className='p-16'>
        <h2 className='text-4xl mb-4 font-bold'>Your Salary</h2>
        <p className='text-2xl font-semibold text-slate-800'>{salary}</p>

      </div>

      <div className='p-16'>
        <h2 className='text-4xl mb-4 font-bold'>Analytics</h2>
        <ExpenseGraph />
      </div>


      <section className='p-16'>
        <h2 className='text-4xl mb-4 font-bold'>Your Records</h2>
        <CategorizedRecords />

      </section>


    </>
  )
}

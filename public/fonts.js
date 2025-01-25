import { Mitr , Markazi_Text , Neuton } from 'next/font/google';

const mitr = Mitr({
    subsets: ['latin'],
    weight: ['400', '500' ,'700'],
    display: 'swap',
})

const markazi = Markazi_Text({
  subsets: ['latin'],
  weight: ['400', '500' ,'700'],
  display: 'swap',
})

const neuton = Neuton({
  subsets: ['latin'],
  weight: ['400' ,'700'],
  display: 'swap',
})

export {mitr,  markazi , neuton};
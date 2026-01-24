import { Mitr , Markazi_Text , Neuton } from 'next/font/google'

// HELPER: CREATE NEW FONT
const createFont = (Font, options) => {

  return Font({

    subsets: options.subsets,
    weight: options.weight,
    display: options.display,

  })
}


// FONTS
const Fonts = {

  mitr: createFont(Mitr, {
    subsets: ['latin'],
    weight: ['400', '500' ,'700'],
    display: 'swap'
  }),

  markazi: createFont(Markazi_Text, {
    subsets: ['latin'],
    weight: ['400', '500' ,'700'],
    display: 'swap'
  }),

  neuton: createFont(Neuton, {
    subsets: ['latin'],
    weight: ['400' ,'700'],
    display: 'swap'
  })
}

export default Fonts
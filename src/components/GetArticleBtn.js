import Router from 'next/router'

const GetArticleBtn = (props = {}) => {
  console.log('btn props: ', props)
  const  { inputData = {}  } = props

  const save = () => {
    localStorage.setItem('finalArticle', JSON.stringify(inputData))
    Router.push('/article')
  }

  return (
    <div className='container py-10 px-10 mx-0 min-w-full flex flex-col items-center'>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={save}
      >

        Give me an article!!
      </button>
    </div>
  )
}

export default GetArticleBtn

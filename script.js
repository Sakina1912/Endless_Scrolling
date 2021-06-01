const postsContainer = document.getElementById('posts-container')
const loader = document.querySelector('.loader')
const filter = document.getElementById('filter')


let limit = 5
let page = 1

async function getPost(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    const data = await res.json()
    return data
}

async function postToDom(){
    const posts = await getPost()

    // console.log(posts)

    posts.forEach(post =>{
        const postElm = document.createElement('div')
        postElm.classList.add('post')

        postElm.innerHTML=`<div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">${post.body}</p>
        </div>`

        postsContainer.appendChild(postElm)
    })
}

postToDom()

function showLoader(){
    loader.classList.add('show')

    setTimeout(()=>{
        loader.classList.remove('show')
        setTimeout(()=>{
            page++
            postToDom()
        },300)
    },1000)
}

function filterPost(e){
   let filterValue = e.target.value.toUpperCase()
   const posts = document.querySelectorAll('.post')

   posts.forEach(post => {
       const title = post.querySelector('.post-title').innerText.toUpperCase()
       const body = post.querySelector('.post-body').innerText.toUpperCase()

       if(title.indexOf(filterValue) > -1 || body.indexOf(filterValue) > -1){
        post.style.display = 'flex'
       }else{
           post.style.display = 'none'
       }
   })

}

// postToDom()

window.addEventListener('scroll', ()=>{
    const {scrollTop,scrollHeight,clientHeight} = document.documentElement

    if(scrollTop + clientHeight >= scrollHeight){
        showLoader()
    }
    
})

filter.addEventListener('input',filterPost)
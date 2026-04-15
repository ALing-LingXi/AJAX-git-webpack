/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */
const creator = "林希"
axios({
  url: "https://hmajax.itheima.net/api/settings",
  params: {
    creator
  }
}).then(res => {
  console.log(res.data.data);
  const DataList = res.data.data
  console.log(Object.keys(DataList))
  Object.keys(DataList).forEach(key => {
    if (key === "avatar") {
      document.querySelector(".prew").src = DataList[key]
    }
    else if (key === "gender") {
      const genders = document.querySelectorAll(`.${key}`)
      genders[DataList[key]].checked = true
    }
    else {
      console.log(document.querySelector(`.${key}`))
      console.log(`.${key}`)
      document.querySelector(`.${key}`).value = DataList[key]
    }
  });
})

// 本地储存图片更换
// 上传图片保存，拿出图片渲染
const upload = document.querySelector(".upload")
upload.addEventListener("change",(e)=>{
  const file = e.target.files[0]
  if(file){
    const url = URL.createObjectURL(file)
     document.querySelector(".prew").src=url
  }
})
const Img = localStorage.getItem("fileImg")
// 提交信息部分
// 1收集信息，2提交给服务器
const myForm = document.querySelector(".user-form")
const submit = document.querySelector(".submit")
submit.addEventListener("click", () => {
  const data = serialize(myForm, { hash: true, empty: true })
  data.gender = +data.gender
  data.creator = creator
  console.log(data)
  axios({
    url: "https://hmajax.itheima.net/api/settings",
    method: "PUT",
    data
  }).then(res=>{
    const toastDom = document.querySelector(".my-toast")
    const toast = new bootstrap.Toast(toastDom)
    toast.show()
  })
})
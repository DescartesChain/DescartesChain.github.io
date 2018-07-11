# 组件&Props
## 1. 函数定义/类定义组件
    ```js
    funciton Welcome(props){
        return <h1>Hello,{props.name}</h1>
    }  

    class Welcome extends React.Component{
        render() {
            retutn <h1>Hello,{this.props.name}</h1>
        }
    }
    ```
## 2. 组件渲染
```js
    function Welcomt(props){
        return <h1>hello,{props.name}</h1>
    	}
      const element = <Welcomt name="Sara"/>
      ReactDOM.render(
        element,
        document.getElementById('example')
    )
```
1. 我们对<Welcome name="Sara" />元素调用了ReactDOM.render()方法。
2. React将{name: 'Sara'}作为props传入并调用Welcome组件。
3. Welcome组件将< h1>Hello, Sara</h1>元素作为结果返回。
4. React DOM将DOM更新为< h1>Hello, Sara</h1>。
## 3. 组件提取
```js
    function formatDate(date){
        return date.toLocaleDateString();
      }
      function Avatar(props){
        return (
          <img className="Avatar"
                src={props.user.avatarUrl}
                alt={props.user.name}
              />
        )
      }
      function UserInfo(props){
        return (
          <div className="UserInfo">
          <Avatar user={props.user}/>
          <div className="UserInfo-name">
            {props.user.name}
          </div>
        </div>
        )
      }
      function Comment(props) {
        return (
          <div className="Comment">
            <UserInfo user={props.author}/>
            <div className="Comment-text">
              {props.text}
            </div>
            <div className="Comment-date">
              {formatDate(props.date)}
            </div>
          </div>
        );
      }
      const comment = {
        date: new Date(),
        text:'FFBaby',
        author:{
          name:'Hello Kitty',
          avatarUrl: 'http://placekitten.com/g/64/64'
        }
      }
      ReactDOM.render(
        <Comment author={comment.author} date={comment.date} text={comment.text}/>,
        document.getElementById('example') 
      )
```

## 4.函数转换成类
1.   创建一个名称扩展为React.Component的ES6类
2. 创建一个叫做render() 的空方法
3. 将函数体移动到空方法内
4. 在render()方法中,使用this.props替换props
5. 删除剩余的空函数声明
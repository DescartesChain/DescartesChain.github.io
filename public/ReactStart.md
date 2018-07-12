# JSX的语法
    const element = <h1>hello,world！</h1>
## 1. 在JSX语法中使用表达式    
    function formatName(user){
        return user.firstName + "" + user.lastName
    }
    const user = {
        firstName: 'FF',
        lastName: 'baby'
    }
    const element = <h1>hello,formatName(user)</h1>
    ReactDOM.render(
        element,
        document.getElementById('要渲染的地方')
    )
## 2. JSX本身也是一种表达式
    function getGreething(user){
        if(user){
            return <h1>hello,{formaName(user)}</h1>
        }
        return <h1>hello<FFBaby</h1>
    }
## 3. 更新元素渲染
    function tick(){
        const element =(
            <div>
                <h1>hello,world</h1>
                <h2>It is {new Date().toLocaleTimeString()}</h2>
            </div> 
        )
        ReactDOM.render(
        element,
        document.getElementById('root')
    )
    }
    
    setInterval(tick,1000)
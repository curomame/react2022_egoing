import { Component } from "react";

class Subject extends Component{
  render(){
    return (
<header>
  <h1>WEB</h1>
  world wide web!
</header>

    );
  }
}

class TOC extends Component{
  render(){
    return(
      <nav>
        <ul>
        <li><a href="1.html">HTML</a></li>
          <li><a href="2.html">CSS</a></li>
          <li><a href="3.html">JavaScript</a></li>
        </ul>
      </nav>
    )
  }
}

class Content extends Component{
  render(){
    return(
      <article>
        <h2>HTML</h2>
        HTML is HyperText Markup Language.
      </article>
    );
  }
}

class App extends Component { //app이라는 클래스를 만들어서 component라는것을 상속한다. 그 안의 메소드가 render()가 있는거당.
  render() {
    return (
      <div className="App">
        <Subject/>
        <TOC/>
        <Content/>
      </div>
    )
  }
}

export default App;

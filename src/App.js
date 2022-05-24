import { Component } from "react";
import TOC from "./components/TOC";
import Content from "./components/Contents";
import Subject from "./components/Subject";


class App extends Component { //app이라는 클래스를 만들어서 component라는것을 상속한다. 그 안의 메소드가 render()가 있는거당.
  
  constructor(props){ //제일 먼저 실행되서 초기화 담당
    super(props);
    this.state = {//스테이트 값 초기화
      subject:{title:"WEB", sub:"worldWideWeb"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is..."},
        {id:2, title:"CSS", desc:"CSS is..."},
        {id:3, title:"JS", desc:"JS is..."}
      ]
    };


  }

  render() {
    return (
      <div className="App">
        <Subject
        title={this.state.subject.title} 
        sub={this.state.subject.sub}/>
        <TOC data={this.state.contents}/>
        <Content title="HTML" desc="description"/>
      </div>
    )
  }
}

export default App;


//props 사용자가 사용하는 입장
//state 내부에 작동하는 것

//Component => 이렇게 저렇게 바꾸고 싶을때 props사용 {props_name = 'props_value'}
//State 내부에서 움직임
//컴포넌트가 좋은 부품이 되기 위해 내부에 state를 철저히 분리해서 사용.
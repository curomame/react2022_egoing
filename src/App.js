import { Component } from "react";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component { //app이라는 클래스를 만들어서 component라는것을 상속한다. 그 안의 메소드가 render()가 있는거당.
  
  constructor(props){ //제일 먼저 실행되서 초기화 담당
    super(props);
    this.state = {//스테이트 값 초기화
//react 스테이트, 프롭스 값 바뀌면, 스테이트를 가진 컴포넌트의 렌더를 다시 진행함
//다시 호출하면서 다시 하위의 컴포넌트도 싹 바뀌게됨
      mode:'welcome',
      selected_content_id:2,
      subject:{title:"WEB", sub:"worldWideWeb"},
      welcome:{title:"welcome", desc:"Hello, React!"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is..."},
        {id:2, title:"CSS", desc:"CSS is..."},
        {id:3, title:"JS", desc:"JS is..."}
      ]
    };


  }


  getReadContent(){
    let i = 0;
    while(i < this.state.contents.length){
      let data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
      }
      i = i+1;
    }
  }

  getContent(){
    let _title, _desc, _article = null;
    this.max_content_id = 3;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}/>
    } else if (this.state.mode === 'read'){
      let _content = this.getReadContent()
      _article = <ReadContent title={_content.title} desc={_content.desc}/>
    } 
    
    
    
    else if (this.state.mode === 'create'){
      _article = <CreateContent onSubmit={(_title, _desc) => {
        this.max_content_id += 1;
        // this.state.contents.push({id:this.max_content_id, title:_title, desc:_desc})
        // push보다는 이게맞음
        // 왜냐면 should component에서 다를때 변경시켜야하기 때문

        // let newContents = Array.from(this.state.contents)
        // newContestns/.push({id:this.max_content_id, title:_title, desc:_desc})
        
        // 배열은 array.from쓰면되고 객체는 Object.assign({},복사할 객체)
        // 첫번째 인자로 해당 값을 주면 해당 값에 복사할 객체 key:value 값들이 추가됨
        // return 값에는 

        // 불변성 immutable
        let _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc})
        this.setState({
          contents:_contents,
          mode:"read",
          selected_content_id:this.max_content_id
        })

      }} />
    } else if (this.state.mode === 'update'){
      let _content = this.getReadContent()
      _article = <UpdateContent data={_content} 
      onSubmit={(_id,_title, _desc) => {
        
        
        //복제
        let _contents = Array.from(this.state.contents);
        let i=0;
        while( i < _contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
          }
          i+=1;
        }
          this.setState({
            contents:_contents,
            mode:"read"
          });
          

      }} />
    } 

    // else if (this.state.mode === 'delete'){

    //   let _content = this.getReadContent()
    //   console.log(_content);

    // }



    return _article;
  }




  render() {


    return (
      <div className="App">
        
        <Subject
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={() => {this.setState({ mode:'welcome'})}}/>

        {/* <header>
          <h1><a href="/" onClick={function(e){
            e.preventDefault();//reload 방지
            this.setState({
              mode:'welcome'
            })
            //this.state.mode = 'welcome' 이런식으로 바꾸면 안댐 // 랜더링 안댐
            // 문제1 이 이벤트가 호출된 함수에서는 this는 아무값도 셋팅되어있지 않음 => .bind(this) 추가
            // 문제2 바뀐줄 모른다는것. 이렇게 하라고 말안했음.
            //bind
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header> */}
        <Control onChangeMode={(_mode) => {

          if(_mode === 'delete'){

            if(window.confirm('really?')){

              let _contents = Array.from(this.state.contents);
              // 1.누구를 삭제할것인지.
              let i = 0;
              while(i<this.state.contents.length){
                
                if(_contents[i].id === this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }

                i++
              }

              this.setState({
                mode:'welcome',
                contents:_contents
              })

              alert('deleted!')
            }

          } else {
            this.setState({
            mode:_mode
          })}

          
        }}/>
        <TOC onChangePage={(id)=>{this.setState({
          mode:'read',
          selected_content_id:Number(id)
      })}} data={this.state.contents}/>

      

        {this.getContent()}
      
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
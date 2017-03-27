import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`

const Gif = class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchQuery: null,
    }
    this.fetch = this.fetch.bind(this)
  }

  componentDidUpdate() { this.fetch() }
  componentDidMount() { this.fetch() }

  fetch() {
    if (this.props.searchQuery === this.state.searchQuery) { return }
    this.element.src = 'http://media2.giphy.com/media/ciBu4XLAThuVi/200.gif'

    this.state = { searchQuery: this.props.searchQuery }
    const url = `${location.protocol}//api.giphy.com/v1/stickers/search`
    const req = `${url}?q=${this.state.searchQuery}&api_key=dc6zaTOxFJmzC`
    fetch(req).then(response => response.json()).then(res => {
      const index = Math.floor(Math.random() * res.data.length)
      this.element.src = res.data[index].images.fixed_height.url
    });
  }

  render() {
    return (
      <Wrapper>
        <img ref={element => this.element = element} />
      </Wrapper>
    )
  }
}

export default Gif

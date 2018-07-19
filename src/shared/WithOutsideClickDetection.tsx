import * as React from 'react';

interface Props {
  onOutsideClick: any;
}

/**
 * Component that alerts if you click outside of it
 */
export const withOutsideClickDetection = (BaseComponent: any) => {
  return class extends React.Component<Props> {
    private clickRef: any;
  
    constructor(props: any) {
        super(props);
        this.clickRef = React.createRef();
    }
    
    componentDidMount() {
      document.addEventListener('mouseup', this.onOutsideClick);
    }
  
    componentWillUnmount() {
      document.removeEventListener('mouseup', this.onOutsideClick);
    }
  
    /**
     * Alert if clicked on outside of element
     */
    onOutsideClick = (event: any) => {
      const domNode = this.clickRef.current;
      if (domNode && !domNode.contains(event.target)) {
        this.props.onOutsideClick();
      }
    }
  
    render() {
      return <div ref={this.clickRef}><BaseComponent {...this.props}/></div>;
    }
  };
};
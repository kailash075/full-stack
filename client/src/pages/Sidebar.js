import React from 'react';
// import 'devextreme/dist/css/dx.light.css';
import TreeView from 'devextreme-react/tree-view';
import ContextMenu from 'devextreme-react/context-menu';
import List from 'devextreme-react/list';
import SelectBox from 'devextreme-react/select-box';

import { products } from './data.js';
import { menuItems } from './datamenu.js';

import "./Sidebar.css";


const options = ['contains', 'startswith', 'equals'];

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.contextMenuRef = React.createRef();
    this.treeViewRef = React.createRef();

    this.state = {
      value: 'contains',
      products: products,
      menuItems: menuItems,
      logItems: [],
      selectedTreeItem: undefined,
    };
    this.valueChanged = this.valueChanged.bind(this);

    this.treeViewItemContextMenu = this.treeViewItemContextMenu.bind(this);
    this.contextMenuItemClick = this.contextMenuItemClick.bind(this);
  }

  
  render() {
    return (
      <React.Fragment>
        <div className="form">
          <TreeView
            id="treeview"
            items={products}
            width={500}
            searchMode={this.state.value}
            searchEnabled={true}
            onItemContextMenu={this.treeViewItemContextMenu}
          />
              <div className="log-container">
                <div><i className="icon dx-icon-clock"></i>&nbsp;Operations log:</div>
                <List
                  id="log"
                  width={400}
                  height={300}
                  showScrollbar="always"
                  items={this.state.logItems} />
              </div>
              <ContextMenu
                ref={this.contextMenuRef}
                dataSource={this.state.menuItems}
                target="#treeview .dx-treeview-item"
                onItemClick={this.contextMenuItemClick} />
        </div>
        <div className="options">
          
          <div className="caption">Options</div>
          <div className="option">
            <span>Search mode</span>
            <SelectBox
              items={options}
              value={this.state.value}
              onValueChanged={this.valueChanged}
            />
          </div>
          
        </div>
      </React.Fragment>
    );
  }

  valueChanged(e) {
    this.setState({ value: e.value });
  }

  get treeView() {
    return this.treeViewRef.current.instance;
  }

  get contextMenu() {
    return this.contextMenuRef.current.instance;
  }

  treeViewItemContextMenu(e) {
    this.setState({
      selectedTreeItem: e.itemData,
    });

    const isProduct = e.itemData.price !== undefined;
    this.contextMenu.option('items[0].visible', !isProduct);
    this.contextMenu.option('items[1].visible', !isProduct);
    this.contextMenu.option('items[2].visible', isProduct);
    this.contextMenu.option('items[3].visible', isProduct);

    this.contextMenu.option('items[0].disabled', e.node.expanded);
    this.contextMenu.option('items[1].disabled', !e.node.expanded);
  }

  contextMenuItemClick(e) {
    let logEntry = '';
    switch (e.itemData.id) {
      case 'expand': {
        logEntry = `The '${this.state.selectedTreeItem.text}' group was expanded`;
        this.treeView.expandItem(this.state.selectedTreeItem.id);
        break;
      }
      case 'collapse': {
        logEntry = `The '${this.state.selectedTreeItem.text}' group was collapsed`;
        this.treeView.collapseItem(this.state.selectedTreeItem.id);
        break;
      }
      case 'details': {
        logEntry = `Details about '${this.state.selectedTreeItem.text}' were displayed`;
        break;
      }
      case 'copy': {
        logEntry = `Information about '${this.state.selectedTreeItem.text}' was copied`;
        break;
      }
      default:
        break;
    }
    const logItems = this.state.logItems.concat([logEntry]);

    this.setState({
      logItems,
    });
  }
}

export default Sidebar;

import React, { PropTypes } from 'react';
import cx from 'classnames';
import ReactTooltip from 'react-tooltip';

const rebuildTooltip = function rebuildTooltip(itemCode) {
  this.props.FireShowItemInfo(itemCode);
  ReactTooltip.rebuild();
};

const Inventory = React.createClass({
  propTypes: {
    ShoppingStore: PropTypes.object.isRequired,
    inventory: PropTypes.object.isRequired,
    Venatems: PropTypes.object.isRequired,
    Items: PropTypes.object.isRequired,
    positionStyle: PropTypes.string.isRequired,
    FireShowItemInfo: PropTypes.func.isRequired,
  },

  createTableColum(venatemId = '', c) {
    const { Venatems, Items } = this.props;
    const venatem = Venatems.get(venatemId.toString());
    let item;

    if (venatem && (venatem.get('item_count') > 0)) {
      const getItem = Items.get(venatem.get('item_id').toString());
      
      item = (
        <div
          data-tip
          data-for={'item'}
          className="content"
          onMouseOver={rebuildTooltip.bind(this, getItem.get('code'))}
        >
          <span className="item-count">{venatem.get('item_count')}</span>
          <img className="item-image" src={getItem.get('image')}/>
        </div>
      )
    } else {
      item = <div className="content"></div>
    }

    return (
      <td key={c}>
        {item}
      </td>
    )
  },
  createTableRow(inventory, col, row) {
    let tableRows = [];
    let r = 0;
    let itemIndex = 0;

    while (++r <= row) {
      let tableCols = [];
      let c = 0;

      while (++c <= col) {
        const listItemId = inventory.get('items').get(itemIndex);

        tableCols.push(this.createTableColum(listItemId, c));

        itemIndex = itemIndex + 1;
      }

      tableRows.push(
        <tr key={r}>
          {tableCols}
        </tr>
      );
    }
    return tableRows;
  },
  createTable(inventory, colNum, rowNum) {

    return (
      <table className="inventory_table">
        <tbody>
        {
          this.createTableRow(inventory, colNum, rowNum)
        }
        </tbody>
      </table>
    );
  },
  render() {

    const { inventory, positionStyle } = this.props;
    const table = this.createTable(inventory, 4, 8);

    const style = cx('user_inventory', {
      [positionStyle]: true
    });

    return (
      <div key="user_inventory" className={style}>
        <h4>인벤토리</h4>
        <div className="inventory_box">
          <ul className="inventory_tap">
            <li className="active">커뮤니티</li>
            <li>뱃지</li>
            <li>이모티콘</li>
          </ul>
          <div className="inventory_scroll">
            {
              table
            }
          </div>

        </div>
      </div>
    );
  }
});

export default Inventory;

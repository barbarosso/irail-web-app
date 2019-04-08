import Downshift from "downshift";

const AutoComplete = ({ items, label }) => (
  <Downshift
    onChange={selection => alert(`You selected ${selection.value}`)}
    itemToString={item => (item ? item.value : "")}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem
    }) => (
      <div>
        <label {...getLabelProps()}>{label}</label>
        <input {...getInputProps()} />
        <ul {...getMenuProps()}>
          {isOpen
            ? items
                .filter(
                  item =>
                    !inputValue ||
                    item.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.name,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : null,
                        fontWeight: selectedItem === item ? "bold" : "normal"
                      }
                    })}
                  >
                    {item.name}
                  </li>
                ))
            : null}
        </ul>
      </div>
    )}
  </Downshift>
);

export default AutoComplete;

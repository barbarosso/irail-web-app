import Downshift from "downshift";

const AutoComplete = ({ items, label, onChange, apiCall }) => (
  <Downshift
    id="auto-complete"
    onChange={selection => onChange(selection)}
    itemToString={item => (item ? item.name : "")}
    defaultHighlightedIndex={0}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      reset
    }) => (
      <div>
        <label {...getLabelProps()}>{label}</label>
        <input
          {...getInputProps({
            onChange: e => {
              const searchValue = e.target.value;
              reset();
              if (apiCall && searchValue) {
                apiCall(searchValue);
              }
            }
          })}
        />
        <ul {...getMenuProps()}>
          {isOpen
            ? items.map((item, index) => (
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

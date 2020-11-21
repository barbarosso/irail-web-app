import { useCombobox } from "downshift";
import { useEffect, useState } from "react";

const AutoComplete = ({ items, onChange, label }) => {
  const [inputItems, setInputItems] = useState(items);
  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    itemToString: (item) => item.name,
    onChange,
    defaultHighlightedIndex: 0,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });
  return (
    <div className={"c-input"} {...getComboboxProps()}>
      <label
        {...getLabelProps({ htmlFor: label })}
        className={"c-input__label"}
      >
        {label}
      </label>
      <input
        className={"c-input__field"}
        {...getInputProps({
          id: label,
          name: label,
        })}
      />
      <ul {...getMenuProps()}>
        {isOpen
          ? inputItems.map((item, index) => (
              <li
                {...getItemProps({
                  key: item.name,
                  index,
                  item,
                  style: {
                    backgroundColor:
                      highlightedIndex === index ? "lightgray" : null,
                    fontWeight: highlightedIndex === index ? "bold" : "normal",
                  },
                })}
              >
                {item.name}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default AutoComplete;

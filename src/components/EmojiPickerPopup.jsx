import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";

function EmojiPickerPopup({ icon, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Trigger button */}
      <button
        type="button"
        className="text-xl"
        onClick={() => setOpen((p) => !p)}
      >
        {icon ? icon : <FaRegSmile />}
      </button>

      {/* Picker */}
      {open && (
        <div className="absolute z-50 mt-2">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onSelect(emojiData.emoji);
              setOpen(false); // close after select
            }}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPickerPopup;

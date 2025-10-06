import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, onDeleteItem }) {
  if (!card) return null;

  const handleDeleteClick = () => {
    onDeleteItem(card._id);
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content ">
        <button onClick={onClose} type="button" className="modal__close">
          X
        </button>
        <img
          src={card.imageUrl || card.link}
          alt={card.name}
          className="modal__image"
        />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>

          <button
            type="button"
            className="modal__delete-button"
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

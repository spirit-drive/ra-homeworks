const CartView = ({ items, isOpen, toggleCart, clearCart, closeOpen }) => (
  <section className="cart" onClick={() => {toggleCart(); closeOpen()}}>
    <div>Корзина</div>
    <div className={`
      cart__content 
      ${isOpen ? 'cart__content_show' : 'cart__content_hide'} 
      ${!!items.length ? 'cart__content_full' : null}
    `}>
      {!!items.length && 
        <div>
          <ul>
            {items.map((item, i) =>
              <li key={i}>{item.title} ({item.price} руб.)</li>
            )}
          </ul>
          <button onClick={() => clearCart()} className="cart__clear">Очистить корзину</button>
        </div>
      }
      {!items.length && <p className="cart__empty">Корзина пуста</p>}
    </div>
  </section>
);

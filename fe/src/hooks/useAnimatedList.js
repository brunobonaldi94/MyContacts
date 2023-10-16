import {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const useAnimatedList = (initialValues = []) => {
  const [items, setItems] = useState(initialValues);
  const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);
  const handleRemoveItem = useCallback((itemId) => {
    setPendingRemovalItemsIds((prev) => [...prev, itemId]);
  }, []);

  const animatedRefs = useRef(new Map());
  const animationEndListeners = useRef(new Map());

  const handleAnimationEnd = useCallback((itemId) => {
    const removeListener = animationEndListeners.current.get(itemId);
    animationEndListeners.current.delete(itemId);
    animatedRefs.current.delete(itemId);
    removeListener();
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    setPendingRemovalItemsIds((prev) => prev.filter((id) => id !== itemId));
  }, []);

  useEffect(() => {
    pendingRemovalItemsIds.forEach((itemId) => {
      const animatedRef = animatedRefs.current.get(itemId);
      const animatedElement = animatedRef?.current;
      const alreadyHasListener = animationEndListeners.current.has(itemId);

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => {
          handleAnimationEnd(itemId);
        };
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd);
        };

        animationEndListeners.current.set(itemId, removeListener);
        animatedElement.addEventListener('animationend', onAnimationEnd);
      }
    });
  }, [pendingRemovalItemsIds, handleAnimationEnd]);
  useEffect(() => {
    const removeListeners = animationEndListeners.current;
    return () => {
      if (removeListeners) {
        removeListeners.forEach((removeListener) => removeListener());
      }
    };
  }, []);
  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);
    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }
    return animatedRef;
  }, []);
  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pendingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);
      return (
        renderItem(item, {
          isLeaving,
          animatedRef,
        })
      );
    })
  ), [items, pendingRemovalItemsIds, getAnimatedRef]);
  return {
    items,
    setItems,
    handleRemoveItem,
    renderList,
  };
};

export default useAnimatedList;

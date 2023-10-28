// import React, {useEffect, useState} from 'react';
// import {useSelector, useDispatch} from 'react-redux';


// const ProductDetail = () => {
    
//     const {id} = useParams();
//     const product = useSelector((state) => state.products.productDetail);
//     const [isLoading, setIsLoading] = useState(true);
//     const dispatch = useDispatch();

//     useEffect (() => {
//         dispatch(getProductDetail(id));
//         return () => {
//             dispatch(cleanDetail());
//         };
//     }, [dispatch, id]);

//     useEffect(() => {
//         const timer = setTimeout(() => {
//           setIsLoading(false);
//           if (product) {
//             setProductActive(product.active);
//           }
//         }, 2000);
//         return () => clearTimeout(timer);
//       }, [product]);

//       return (
//         <>
//           {isLoading ? (
//             <div className={style.loadingContainer}>
//               <p>Cargando...</p>
//             </div>
//           ) : (
//             <Container maxWidth="md">
//               <Paper elevation={3} className={style.eventInfo}>
//                 <Link to={"/home"} className={style.goBack}>
//                   ← Volver al listado de eventos
//                 </Link>
//                 <Typography variant="h4" component="div" gutterBottom>
//                   {event.title}
//                 </Typography>
//                 <Typography variant="subtitle1" gutterBottom>
//                   <ListItemIcon>
//                     <LocationOnIcon />
//                   </ListItemIcon>
//                   Lugar: {event.placeId.direction}, {event.placeId.city},{" "}
//                   {event.placeId.country}
//                 </Typography>
//                 {/* Mostrar imagen solo si hay stock */}
//                 {!isSoldOut && (
//                   <img src={event.images[0]} alt={event.title} className={style.image} />
//                 )}
//                 <hr />
//                 <div className={style.eventDescription}>
//                   <Typography variant="h6" gutterBottom>
//                     <DescriptionIcon />
//                   </Typography>
//                   <Typography variant="body1">{event.summary}</Typography>
//                 </div>
//                 <Typography variant="h6" gutterBottom>
//                   {eventActive ? ( 
//                     <CheckCircleIcon color="success" /> 
//                   ) : (
//                     <BlockIcon color="error" /> 
//                   )}
//                   Precio boleta: ${event.price}
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                   {/* Mostrar disponibilidad de boletas solo si no está agotado */}
//                   {isSoldOut ? "Agotado" : `Boletas disponibles: ${event.stock}`}
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                   <EventIcon />
//                   Fecha: {new Date(event.date).toLocaleDateString()}{" "}
//                   {new Date(event.date).toLocaleTimeString()}
//                 </Typography>
//                 <Typography variant="h6" gutterBottom>
//                   <CategoryIcon />
//                   Categorías
//                 </Typography>
//                 <List dense>
//                   {event.categories.map((category) => (
//                     <ListItem key={category._id}>
//                       <ListItemIcon>
//                         <CategoryIcon />
//                       </ListItemIcon>
//                       <ListItemText primary={category.name} />
//                     </ListItem>
//                   ))}
//                 </List>
//                 {eventActive && isAdmin && ( 
//                   <Button
//                     onClick={() => {
//                       handleActiveEvent(event._id, false); 
//                       setEventActive(false); 
//                     }}
//                   >
//                     Desactivar Evento
//                   </Button>
//                 )}
//                 {!eventActive && isAdmin && ( 
//                   <Button
//                     onClick={() => {
//                       handleActiveEvent(event._id, true); 
//                       setEventActive(true); 
//                     }}
//                   >
//                     Activar Evento
//                   </Button>
//                 )}
//                 {checkIfAdmin()} 
//                 <ReviewsComponent reviewedItemId={event._id} reviewedItemType="event" />
//               </Paper>
//             </Container>
//           )}
//         </>
//       );
//     };
  
//   export default ProductDetail;

// detail.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ProductId } from '../../redux/actions/getProducts';

ProductId
const Detail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productById.product);
  const loading = useSelector((state) => state.productById.loading);
  const error = useSelector((state) => state.productById.error);

  useEffect(() => {
    // Llama a la acción para buscar el producto por su ID cuando el componente se monta
    dispatch(ProductById(productId));
  }, [dispatch, productId]);

  if (loading === 'loading') {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  return (
    <div>
      <h2>Detalles del Producto</h2>
      <h3>{product.name}</h3>
      <p>Categoría: {product.category}</p>
      <p>Color: {product.color || 'No especificado'}</p>
      <p>Descripción: {product.description || 'No disponible'}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Valoración promedio: {product.averageRating || 'No calificado'}</p>
      <p>Descuento: {product.discount}%</p>
    </div>
  );
};

export default Detail;

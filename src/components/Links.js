import React, { useEffect, useState } from 'react';
import LinkForm from './LinkForm';
import { toast } from 'react-toastify';

import { db } from '../firebase';

const Links = () => {

  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const addOrEditLink = async (linkObject) => {
    // console.log(linkObject);
    try {
      if (currentId === "") {
        //agrego a la base de datos la data generando un ID
        await db.collection('links').doc().set(linkObject);
        // console.log('new task added');
        toast('New link added', {
          type: 'success'
        });
      } else {
        await db.collection('links').doc(currentId).update(linkObject);
        toast('Link updated', {
          type: 'info'
        });
        setCurrentId('');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const onDeleteLink = async (id) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      await db.collection('links').doc(id).delete();
      toast('Link removed', {
        type: 'error',
        autoClose: 2000
      });
    }
  }

  const getLinks = async () => {
    db.collection('links').onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(doc => {
        //combinar objeto con id
        docs.push({ ...doc.data(), id: doc.id });
      });
      // console.log(docs);
      setLinks(docs);
    });
  };

  useEffect(() => {
    // console.log('getting data');
    getLinks();
  }, []);

  return (
    <div className="col-lg-6 mx-auto">
      <div className="p-2"> {/*col-md-4 */}
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="p-2"> {/*col-md-8 */}
        {links.map(link => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>
                    close
                  </i>
                  <i className="material-icons" onClick={() => setCurrentId(link.id)}>
                    create
                  </i>
                </div>
              </div>
              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noreferrer">
                Go to website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Links;
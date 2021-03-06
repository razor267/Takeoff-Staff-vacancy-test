import React, {memo, useState} from 'react'
import styles from './ContactItem.module.css'
import editLogo from '../../img/edit.svg'
import deleteLogo from '../../img/delete.svg'
import {ContactType} from '../../types/types'
import {useDispatch} from 'react-redux'
import {highLightText} from '../../utils/highLightText/highLightText'
import {actions} from '../../redux/actions'
import {FormAddEditContact} from '../FormAddEditContact/FormAddEditContact'
import {contactsAPI} from '../../api/contactsAPI'


type PropsType = {
    item: ContactType
    highLight: string
}
export const ContactItem: React.FC<PropsType> = memo(({item, highLight}) => {

    const dispatch = useDispatch()

    const [visibleEditForm, setVisibleEditForm] = useState(false)
    const [isRemove, setIsRemove] = useState(false)

    const {name, surname, company, address, number} = item

    const editContact = (contact: ContactType, id: number) => {
        contactsAPI.editContact(contact, id)
            .then(() => {
                dispatch(actions.editContact(contact, id))
                setVisibleEditForm(false)
            })
            .catch(error => console.log(error))
    }

    const closeEditForm = () => {
        setVisibleEditForm(false)
    }

    const removeContact = () => {
        contactsAPI.removeContact(item.id)
            .then(() => dispatch(actions.removeContact(item.id)))
            .catch(error => console.log(error))
    }

    //если форма редактирования контакта закрыта показать контакт, иначе форму редактированния
    return (
        <div>
            {!visibleEditForm ?
                <div className={styles.wrapper}>
                    <span>{highLight ? highLightText(highLight, surname) : surname}</span>
                    <span>{highLight ? highLightText(highLight, name) : name}</span>
                    <span>{highLight ? highLightText(highLight, company) : company}</span>
                    <span>{highLight ? highLightText(highLight, address) : address}</span>
                    <span>{highLight && number ? highLightText(highLight, number.toString()) : number}</span>
                    <span
                        title='Редактировать'
                        className={styles.edit}
                        onClick={() => setVisibleEditForm(true)}
                    >
                        <img src={editLogo} alt="edit"/>
                    </span>
                    <span
                        title='Удалить'
                        className={styles.delete}
                        onClick={() => setIsRemove(true)}
                    >
                        <img src={deleteLogo} alt="delete"/>
                    </span>
                </div> :
                <FormAddEditContact
                    type='EditForm'
                    initialValues={{
                        id: item.id,
                        surname: item.surname,
                        name: item.name,
                        company: item.company,
                        address: item.address,
                        number: item.number,
                        userId: item.userId
                    }}
                    editContact={editContact}
                    closeEditForm={closeEditForm}
                    contact={item}
                />}
            {isRemove &&
            <div className={styles.removeWrapper}>
                <span>Вы уверены что хотите удалить контакт {surname} {name}?</span>
                <span className={styles.button} onClick={removeContact}>
                    <span className={styles.removeText}>Удалить</span>
                </span>
                <span className={styles.button} onClick={() => setIsRemove(false)}>Отмена</span>
            </div>}
        </div>
    )
})
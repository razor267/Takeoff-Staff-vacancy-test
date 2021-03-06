import {ActionsTypes, ContactType, StateType} from '../types/types'

const initialState: StateType = {
    contacts: [],
    userId: 0
}
export const reducer = (state = initialState, action: ActionsTypes): StateType => {
    switch (action.type) {
        case 'ADD_ALL_CONTACTS':
            return {
                ...state,
                contacts: action.contacts
            }
        case 'REMOVE_CONTACT':
            const newState = state.contacts.filter(item => item.id !== action.id)
            return {
                ...state,
                contacts: newState
            }
        case 'ADD_CONTACT':
            const newContact: ContactType = {
                id: action.id,
                name: action.contact.name,
                surname: action.contact.surname,
                company: action.contact.company,
                address: action.contact.address,
                number: action.contact.number,
                userId: action.contact.userId
            }
            return {
                ...state,
                contacts: [...state.contacts, newContact]
            }
        case 'EDIT_CONTACT':
            let newContacts: ContactType[] = JSON.parse(JSON.stringify(state.contacts))
            newContacts.forEach(item => {
                if (item.id === action.id) {
                    item.name = action.contact.name
                    item.surname = action.contact.surname
                    item.company = action.contact.company
                    item.address = action.contact.address
                    item.number = action.contact.number
                    item.userId = action.contact.userId
                }
            })
            return {
                ...state,
                contacts: newContacts
            }
        case 'LOGIN':
            return {
                ...state,
                userId: action.id
            }
        case 'LOGOUT':
            return {
                ...state,
                userId: action.id
            }
        case 'CLEAR_CONTACTS':
            return {
                ...state,
                contacts: []
            }
        default:
            return state
    }
}
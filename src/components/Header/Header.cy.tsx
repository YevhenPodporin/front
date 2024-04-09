import React from 'react'
import Header from './Header'
import {UserProfile} from "../../api/models/UserProfile";

describe('<Header />', () => {
    const testUser: UserProfile = {
        file_path: '',
        email: 'test9999@gmail.com',
        first_name: 'Test99999',
        last_name: 'Testovich9999',
        date_of_birth: '1995-18-01',
        is_online: true,
        id: 99999
    }

    const getPopupWrapper = (visible: boolean) => cy.get(`.popup_wrapper${visible ? '.show' : '.hide'}`);

    beforeEach(() => {
        cy.mount(<Header/>)
        cy.intercept('GET', process.env.REACT_APP_PUBLIC_URL + '/user/profile', {body: testUser});
    })

    it('check elements', () => {
        cy.get('header.header_main')
        cy.get('.left_side>p').should('contain.text', testUser.first_name + ' ' + testUser.last_name)
        cy.get('.header__links>a').should('have.length', 3)
        cy.get('.signout_btn')

        getPopupWrapper(false)
    })

    it('Check opening and close modal by click', () => {
        const imageWrapper = cy.get('div.left_side .image_wrapper');
        imageWrapper.click()
        getPopupWrapper(true).should('be.visible').click(0, 0)
    })
})
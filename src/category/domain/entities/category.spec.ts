import { omit } from 'lodash'
import { v4 as uuidV4 } from 'uuid'

import { Category } from './category'
import { UniqueEntityId } from '../../../@seedwork/domain/unique-entity-id.vo'

describe('Category Unit Tests', () => {
  describe('Constructor of Category', () => {
    it('constructor of category with only name', () => {
      const category = new Category({ name: 'Movie' })

      let props = omit(category.props, 'created_at')
      expect(props).toStrictEqual({
        name: 'Movie',
        description: null,
        is_active: true,
      })
      expect(category.props.created_at).toBeInstanceOf(Date)
    })

    it('constructor of category with name, description and is_active', () => {
      const created_at = new Date()

      const category = new Category({
        name: 'Movie',
        description: 'some description',
        is_active: false,
        created_at
      })

      expect(category.props).toStrictEqual({
        name: 'Movie',
        description: 'some description',
        is_active: false,
        created_at
      })
    })

    it('constructor of category with name and description', () => {
      const category = new Category({
        name: 'Movie',
        description: 'some description',
      })

      expect(category.props).toMatchObject({
        name: 'Movie',
        description: 'some description',
      })
    })

    it('constructor of category with name and is_active', () => {
      const category = new Category({
        name: 'Movie',
        is_active: true,
      })

      expect(category.props).toMatchObject({
        name: 'Movie',
        is_active: true,
      })
    })

    it('constructor of category with name and created_at', () => {
      const created_at = new Date()

      const category = new Category({
        name: 'Movie',
        created_at,
      })

      expect(category.props).toMatchObject({
        name: 'Movie',
        created_at,
      })
    })
  })

  describe('Getters and Setters of Category', () => {
    describe('Id field', () => {
      it('generate id when not informed', () => {
        const category = new Category({ name: 'Movie' });

        expect(category.id).not.toBeNull()
        expect(category.id).toBeInstanceOf(UniqueEntityId)
      })

      it('generate id when not informed null', () => {
        const category = new Category({ name: 'Movie' }, null);

        expect(category.id).not.toBeNull()
        expect(category.id).toBeInstanceOf(UniqueEntityId)
      })

      it('generate id when not informed undefined', () => {
        const category = new Category({ name: 'Movie' }, undefined);

        expect(category.id).not.toBeNull()
        expect(category.id).toBeInstanceOf(UniqueEntityId)
      })

      it('generate id when void uuid', () => {
        const uuid = new UniqueEntityId()
        const category = new Category({ name: 'Movie' }, uuid);

        expect(category.id).not.toBeNull()
        expect(category.id).toBeInstanceOf(UniqueEntityId)
      })

      it('generate id when informed uuid', () => {
        const uuid = new UniqueEntityId(uuidV4())
        const category = new Category({ name: 'Movie' }, uuid);

        expect(category.id).not.toBeNull()
        expect(category.id).toBeInstanceOf(UniqueEntityId)
      })
    })
    describe('Name field', () => {
      it('getter of field name', () => {
        const category = new Category({ name: 'Movie' })

        expect(category.name).toBe('Movie')
      })
    })

    describe('Description field', () => {
      it('description getter to be null', () => {
        const categoryDescriptionNull = new Category({ name: '' })

        expect(categoryDescriptionNull.description).toBeNull()
      })

      it('description getter to be correct', () => {
        const category = new Category({ name: 'Movie', description: 'some description' })

        expect(category.description).toBe('some description')
      })

      it('description setter to be correct', () => {
        const categoryTestSetter = new Category({ name: '' })
        categoryTestSetter['description'] = 'other description'

        expect(categoryTestSetter.description).toBe('other description')
      })

      it('description setter is null with undefined', () => {
        const categoryTestSetter = new Category({ name: '' })
        categoryTestSetter['description'] = undefined

        expect(categoryTestSetter.description).toBeNull()
      })

      it('description setter is null with null', () => {
        const categoryTestSetter = new Category({ name: '' })
        categoryTestSetter['description'] = null

        expect(categoryTestSetter.description).toBeNull()
      })
    })

    describe('Is_active field', () => {
      it('is_active getter is true with undefined', () => {
        const categoryIsActiveNull = new Category({ name: '' })

        expect(categoryIsActiveNull.is_active).toBeTruthy()
      })

      it('is_active getter is true with true', () => {
        const categoryIsActiveNull = new Category({ name: '', is_active: true })

        expect(categoryIsActiveNull.is_active).toBeTruthy()
      })

      it('is_active getter is false with false', () => {
        const category = new Category({ name: 'Movie', is_active: false })

        expect(category.is_active).toBeFalsy()
      })

      it('is_active setter is true with true', () => {
        const categoryTestSetter = new Category({ name: '' })
        categoryTestSetter['is_active'] = true

        expect(categoryTestSetter.is_active).toBeTruthy()
      })

      it('is_active setter is false with false', () => {
        const categoryTestSetter = new Category({ name: '' })
        categoryTestSetter['is_active'] = false

        expect(categoryTestSetter.is_active).toBeFalsy()
      })
    })

    describe('Created_at field', () => {
      it('created_at instance of Date', () => {
        const category = new Category({ name: '' })

        expect(category.created_at).toBeInstanceOf(Date)
      })

      it('created_at is new created_at', () => {
        const created_at = new Date()
        const category = new Category({ name: '', created_at })

        expect(category.created_at).toBe(created_at)
      })
    })
  })
})

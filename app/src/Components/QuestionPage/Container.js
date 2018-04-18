import React from 'react';
import { branch, compose, lifecycle, renderComponent, withStateHandlers } from 'recompose';
import { Redirect, withRouter } from 'react-router';
import { db } from '../../utils';
import AppLoader from '../Loaders/AppLoader';
import Component from './Component';
import { connect } from 'react-redux';
import setSort from '../../modules/answerSort/actions.js';

const enhance = compose(
  withStateHandlers({ question: {}, author: {}, isFetching: true }),

  withRouter,

  branch(
    ({ match }) => match.params.questionId,
    lifecycle({
      async componentWillMount() {
        const questionId = this.props.match.params.questionId;
       
        const question = await db.questions.findOne(questionId);
        let author;
        if (question) {
          author = await db.users.findOne(question.createdById);
        }

        this.setState({ question, author, isFetching: false });
      },
    }),
  ),

  branch(
    ({ isFetching }) => isFetching,
    renderComponent(AppLoader)
  ),
  branch(({ question }) => !question, renderComponent(() => <Redirect to="/not-found" />))
);

const mapStateToProps = state => ({
    sortBy: state.answerSort.sortBy,
});

const mapDispatchToProps = dispatch => ({
  setSorting: e => dispatch(setSort(e.target.value))
});

export default connect(mapStateToProps,mapDispatchToProps)(enhance(Component));
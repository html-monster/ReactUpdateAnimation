import ReactCSSTransitionGroupChild from 'react/lib/ReactCSSTransitionGroupChild';

export default class AnimateOnUpdateChild extends ReactCSSTransitionGroupChild
{
	getClass(obj)
	{
		return {}.toString.call(obj).slice(8, -1);
	}

	shouldComponentUpdate(nextProps)
	{
		let key = nextProps.children.props['data-verify'];

		if(this.getClass(key) == 'Array'){
			key.forEach((item) => {
				compareValue(this, item);
			});
		}
		else
			compareValue(this, key);

		function compareValue(context, keyValue) {
			let oldData, newData;

			if(!context.props.data) return false;

			oldData = context.props.data[keyValue];
			newData = nextProps.data[keyValue];

			if(!!(newData && oldData != newData)){
				context.transition('enter', null, context.props.enterTimeout);
			}
		}
		return true;
	}
}
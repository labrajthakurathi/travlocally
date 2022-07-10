// import React, { useEffect, useState } from "react";

// const Paragraph = ({ setBlogUi, blog, blogUi }) => {
// 	const [text1, setText1] = useState(blog);

// 	const handleChange = (e) => {
// 		setText1({ ...text1, content: e.target.value });
// 	};
// 	const handleSubmit = () => {
// 		if (text1.content != "") {
// 			let nu = blogUi.filter((ui) => ui.pos !== text1.pos);
// 			let newOne = [...nu, { ...text1 }];
// 			let sortedData = newOne.sort((a, b) => {
// 				return a.pos - b.pos;
// 			});
// 			setBlogUi(sortedData);
// 			let dta = JSON.stringify(sortedData);

// 			blogUi && JSON.stringify(localStorage.setItem("blog-ui", dta));
// 		}
// 	};

// 	return (
// 		<div className='title'>
// 			<label htmlFor='title'>Paragraph</label>

// 			<textarea
// 				type='text'
// 				rows='6'
// 				id='title'
// 				value={text1.content}
// 				onChange={handleChange}
// 				onBlur={handleSubmit}
// 			/>
// 			<div className='para-tools'>
// 				<i class='fas fa-bold'></i>
// 				<i class='fas fa-italic'></i>
// 				<i class='fas fa-link'></i>
// 			</div>
// 		</div>
// 	);
// };

// export default Paragraph;

import React from "react";

import {
	Editor,
	EditorState,
	RichUtils,
	convertToRaw,
	convertFromRaw,
} from "draft-js";

class Paragraph extends React.Component {
	constructor(props) {
		super(props);
		const content = window.localStorage.getItem(`content${props.blog.pos}`);

		// if (content) {
		// 	this.state.editorState = EditorState.createWithContent(
		// 		convertFromRaw(JSON.parse(content))
		// 	);
		// } else {
		// 	this.state.editorState = EditorState.createEmpty();
		// }

		if (content) {
			this.state = {
				editorState: EditorState.createWithContent(
					convertFromRaw(JSON.parse(content))
				),
			};
		} else {
			this.state = {
				editorState: EditorState.createEmpty(),
			};
		}

		// this.state = { editorState: EditorState.createEmpty() };

		this.focus = () => this.refs.editor.focus();

		this.onChange = (editorState) => {
			this.setState({ editorState });
			window.localStorage.setItem(
				`content${props.blog.pos}`,
				JSON.stringify(convertToRaw(editorState.getCurrentContent()))
			);

			let data = convertToRaw(editorState.getCurrentContent());

			let blogUi = this.props.blogUi;

			let blog = this.props.blog;

			let newBlog = {
				...blog,
				content: convertToRaw(editorState.getCurrentContent()),
			};
			let filtered = blogUi.filter((ui) => ui.pos !== blog.pos);

			let oneData = [...filtered, newBlog];
			let finalData = oneData.sort((a, b) => {
				return a.pos - b.pos;
			});
			this.props.setBlogUi(finalData);
			let processedData = JSON.stringify(finalData);

			localStorage.setItem("blog-ui", processedData);
		};

		this.handleKeyCommand = (command) => this._handleKeyCommand(command);
		this.onTab = (e) => this._onTab(e);
		this.toggleBlockType = (type) => this._toggleBlockType(type);
		this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
	}

	_handleKeyCommand(command) {
		const { editorState } = this.state;
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			this.onChange(newState);
			return true;
		}
		return false;
	}

	_onTab(e) {
		const maxDepth = 4;
		this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
	}

	_toggleBlockType(blockType) {
		this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
	}

	_toggleInlineStyle(inlineStyle) {
		this.onChange(
			RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
		);
	}

	render() {
		const { editorState } = this.state;

		// If the user changes block type before entering any text, we can
		// either style the placeholder or hide it. Let's just hide it now.
		let className = "RichEditor-editor";
		var contentState = editorState.getCurrentContent();
		if (!contentState.hasText()) {
			if (contentState.getBlockMap().first().getType() !== "unstyled") {
				className += " RichEditor-hidePlaceholder";
			}
		}

		return (
			<div className='RichEditor-root-wrapper'>
				<label htmlFor=''>Text</label>
				<div className='RichEditor-root'>
					<BlockStyleControls
						editorState={editorState}
						onToggle={this.toggleBlockType}
					/>
					<InlineStyleControls
						editorState={editorState}
						onToggle={this.toggleInlineStyle}
					/>
					<div className={className} onClick={this.focus}>
						<Editor
							blockStyleFn={getBlockStyle}
							editorState={editorState}
							handleKeyCommand={this.handleKeyCommand}
							onChange={this.onChange}
							onTab={this.onTab}
							placeholder='Tell a story...'
							ref='editor'
							spellCheck={true}
						/>
					</div>
				</div>
			</div>
		);
	}
}

// Custom overrides for "code" style.
const styleMap = {
	CODE: {
		backgroundColor: "rgba(0, 0, 0, 0.05)",
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2,
	},
};

function getBlockStyle(block) {
	switch (block.getType()) {
		case "blockquote":
			return "RichEditor-blockquote";
		default:
			return null;
	}
}

class StyleButton extends React.Component {
	constructor() {
		super();
		this.onToggle = (e) => {
			e.preventDefault();
			this.props.onToggle(this.props.style);
		};
	}

	render() {
		let className = "RichEditor-styleButton";
		if (this.props.active) {
			className += " RichEditor-activeButton";
		}

		return (
			<span className={className} onMouseDown={this.onToggle}>
				{this.props.label}
			</span>
		);
	}
}

const BLOCK_TYPES = [
	{ label: "H1", style: "header-one" },
	{ label: "H2", style: "header-two" },
	{ label: "H3", style: "header-three" },
	{ label: "Blockquote", style: "blockquote" },
	{ label: <i className='fas fa-list-ul'></i>, style: "unordered-list-item" },
	{ label: <i className='fas fa-list-ol'></i>, style: "ordered-list-item" },
];

const BlockStyleControls = (props) => {
	const { editorState } = props;
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className='RichEditor-controls'>
			{BLOCK_TYPES.map((type, index) => (
				<StyleButton
					key={index}
					active={type.style === blockType}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};

var INLINE_STYLES = [
	{ label: <i className='fas fa-bold'></i>, style: "BOLD" },
	{ label: <i className='fas fa-italic'></i>, style: "ITALIC" },
	{ label: <i className='fas fa-underline'></i>, style: "UNDERLINE" },
	{ label: "Link", style: "UNDERLINE" },
];

const InlineStyleControls = (props) => {
	var currentStyle = props.editorState.getCurrentInlineStyle();
	return (
		<div className='RichEditor-controls'>
			{INLINE_STYLES.map((type, index) => (
				<StyleButton
					key={index}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};
export default Paragraph;

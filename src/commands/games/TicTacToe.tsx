import { ButtonInteraction, ChatInputCommandInteraction, ColorResolvable, User, userMention } from "discord.js";
import { useState } from "react";

type CellState = "" | "X" | "O";
type GameState = CellState[];
type Turn = "player" | "opponent";

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const xSymbol = "❌";
const oSymbol = "⭕";
const zeroWidthSpace = "​";

export const getOutcome = (state: GameState): "draw" | "X" | "O" | "continue" => {
    for (let [i1, i2, i3] of winPatterns) {
        let a = state[i1];
        let b = state[i2];
        let c = state[i3];

        if (!a || !b || !c) continue;
        if (a == b && b == c) {
            return a; // winner
        };
    };

    if (!state.includes("")) return "draw";

    return "continue";
};

export const TicTacToe = ({
    interaction,
}: {
    interaction: ChatInputCommandInteraction;
}) => {
    const player = interaction.user;
    const [opponent, setOpponent] = useState<User | null>(null);
    const [state, setState] = useState<GameState>(Array(9).fill(""));
    const [turn, setTurn] = useState<Turn>("player");
    const [alertMessage, setAlert] = useState("");

    const nextTurn = () => setTurn(t => t == "player" ? "opponent" : "player");
    const turnUser = (turn == "player" ? player : opponent);

    const outcome = getOutcome(state);

    let color: ColorResolvable | undefined;
    if(opponent) color = turn == "opponent" ? "Blurple" : "Red";
    if(outcome == "draw") color = "Grey";
    if(outcome == "X") color = "Red";
    if(outcome == "O") color = "Blurple";

    return (
        <message v2>
            <container color={color}>
                <text>
                    # TicTacToe
                </text>

                {opponent && turnUser ? (
                    <>
                        <text>
                            {userMention(player.id)} {xSymbol} vs {oSymbol} {userMention(opponent.id)}
                        </text>

                        {outcome == "continue" && (
                            <text>
                                It's **{turnUser.displayName}**'s turn.
                            </text>
                        )}

                        {outcome == "draw" && (
                            <text>
                                ### Draw
                            </text>
                        )}

                        {(outcome == "X" || outcome == "O") && (
                            <text>
                                ### Winner: {outcome == "X" ? userMention(player.id) : userMention(opponent.id)} 🏆
                            </text>
                        )}

                        <separator divider />

                        <ButtonGrid3x3
                            state={state}
                            disabled={outcome !== "continue"}
                            onClick={(int, idx) => {
                                if (int.user.id !== turnUser.id) {
                                    setAlert(`It's not your turn, **${int.user.displayName}**!`);
                                    return;
                                };

                                if(!!state[idx]) {
                                    setAlert("That spot is taken!");
                                    return;
                                };

                                setState((oldState) => oldState.map((oldCell, i) => i == idx ? (
                                    turn == "player" ? "X" : "O"
                                ) : oldCell));
                                nextTurn();
                                setAlert("");
                            }}
                        />
                    </>
                ) : (
                    <>
                        <text>
                            Who wants to play against **{player.displayName}**?
                        </text>
                        <row>
                            <button
                                style="success"
                                onClick={(int) => {
                                    if (int.user.id == player.id) {
                                        setAlert(`You can't play against yourself, ${player.displayName}!`);
                                        return;
                                    };

                                    setOpponent(int.user);
                                    setAlert("");
                                }}
                            >
                                Play
                            </button>
                        </row>
                    </>
                )}

                {outcome == "continue" && alertMessage && (
                    <text>
                        ⚠️ {alertMessage}
                    </text>
                )}
            </container>
        </message>
    );
};

export const ButtonGrid3x3 = ({
    state,
    onClick,
    disabled,
}: {
    state: GameState;
    onClick?: (int: ButtonInteraction, idx: number) => void;
    disabled?: boolean;
}) => {
    const btn = (idx: number) => (
        <button
            style={!!state[idx] ? (
                state[idx] == "X" ? "danger" : "primary"
            ) : "secondary"}
            onClick={(int) => onClick?.(int, idx)}
            disabled={disabled}
        >
            {state[idx] == "O" && oSymbol}
            {state[idx] == "X" && xSymbol}
            {state[idx] == "" && zeroWidthSpace}
        </button>
    );

    return (
        <>
            <row>
                {btn(0)}
                {btn(1)}
                {btn(2)}
            </row>
            <row>
                {btn(3)}
                {btn(4)}
                {btn(5)}
            </row>
            <row>
                {btn(6)}
                {btn(7)}
                {btn(8)}
            </row>
        </>
    );
};
